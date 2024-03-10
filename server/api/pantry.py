"""
Module to utilize the Pantry API to read and write JSON data
"""

import os
import requests
from dotenv import load_dotenv

DOMAIN = "https://getpantry.cloud/apiv1/pantry"


def get_pantry_ref():
    load_dotenv()
    pantry_id = os.getenv("PANTRY_ID")

    if pantry_id is None:
        raise ReferenceError("Enviornment Variable 'PANTRY_ID' not found")

    return Pantry(pantry_id)


def get_stats_ref():
    return Stats(get_pantry_ref())


class Pantry:
    """
    Object to interact with the pantry API
    """
    def __init__(self, pantry_id: str):
        self._id = pantry_id

    def get_basket(self, name: str):
        """
        Returns:
        - The data in the basket, on success
        - `None`, if the basket was not found
        """
        response = requests.get(
            f"{DOMAIN}/{self._id}/basket/{name}",
            timeout=1000
        )
        if not response.ok:
            return None

        return response.json()

    def set_basket(self, name: str, json_data: any):
        """
        Sets the basket with the name given. The data must be JSON
        serializable.

        Returns:
        - `True`, if the basket was set succesfully
        - `False`, if error
        """
        response = requests.post(
            f"{DOMAIN}/{self._id}/basket/{name}",
            json=json_data,
            timeout=1000,
        )
        if not response.ok:
            print("ERROR: set_basket failed")
            return False

        return True

    def delete_basket(self, name: str):
        """
        IRREVERSIBLE, PERMANENT DELETION

        Returns:
        - `True`, if the basket was deleted succesfully
        - `False`, if error
        """
        response = requests.delete(
            f"{DOMAIN}/{self._id}/basket/{name}",
            timeout=1000,
        )
        if not response.ok:
            return False

        return True


class Stats:
    """
    Object to interact with integer stats within a pantry
    """
    def __init__(self, pantry: Pantry):
        self._pantry = pantry


    # public methods

    def get_link_count(self):
        return self._get("linkCount", 0)

    def get_visitor_count(self):
        return self._get("visitorCount", 0)

    def count_link(self):
        self._increment("linkCount")

    def count_visitor(self):
        self._increment("visitorCount")


    # private helpers

    def _get(self, key: str, default: int):
        stats = self._pantry.get_basket("stats")
        if not isinstance(stats, dict):
            return default

        value = stats.get(key)
        if not isinstance(value, int):
            return default

        return value

    def _increment(self, key: str):
        stats = self._pantry.get_basket("stats")
        if stats is None:
            stats = {}
        elif not isinstance(stats, dict):
            raise TypeError("Basket 'stats' is of the wrong type")

        stats[key] = stats.get(key, 0) + 1
        self._pantry.set_basket("stats", stats)
