import os
import requests
from dotenv import load_dotenv

DOMAIN = "https://getpantry.cloud/apiv1/pantry"

def get_pantry():
    return Pantry(_get_pantry_id())


def _get_pantry_id():
    load_dotenv()
    pantry_id = os.getenv("PANTRY_ID")

    if pantry_id is None:
        raise ReferenceError("Enviornment Variable 'PANTRY_ID' not found")

    return pantry_id


class Pantry:
    """
    Wrapper to interact with the pantry API
    """
    def __init__(self, pantry_id: str):
        self._id = pantry_id

    def get_details(self):
        response = requests.get(f"{DOMAIN}/{self._id}", timeout=1000)

        if not response.ok:
            # The ID is sensitive info so it isn't given back out
            raise ReferenceError("Pantry could not be accessed")

        return response.json()

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

    def set_basket(self, name: str, data: any):
        """
        Sets the basket with the name given. The data must be JSON
        serializable.

        Returns:
        - `True`, if the basket was set succesfully
        - `False`, if error
        """
        response = requests.post(
            f"{DOMAIN}/{self._id}/basket/{name}",
            json=data,
            timeout=1000,
        )
        if not response.ok:
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
