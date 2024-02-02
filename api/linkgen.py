import string
import random

import urllib.parse
from cryptography.fernet import Fernet

ALPHANUMERIC_CHARS = string.ascii_uppercase + string.digits
CIPHER_LEN = 700

ENDPOINT = "/links/navigate"

# public functions

def generate_url(shortlink: str):
    key = Fernet.generate_key()
    ciphertext = _encrypt(shortlink, key)

    return _format_url(len(shortlink), ciphertext, key)


def decode_url(ciphertext: str, length: int, key: bytes):
    # TODO: validate url
    full_text = _decrypt(ciphertext, key)

    return full_text[:length]


# private helpers

def _format_url(length: int, ciphertext: str, key: bytes):
    # encode strings to URL format
    url_ciphertext = urllib.parse.quote(ciphertext)
    url_key = urllib.parse.quote(key)

    return f"{ENDPOINT}" \
        + f"?key={url_key}" \
        + f"&length={length}" \
        + f"&ciphertext={url_ciphertext}"


def _encrypt(text: str, key: bytes):
    if len(text) > CIPHER_LEN:
        raise ReferenceError("Unimplemented")

    padding = CIPHER_LEN - len(text)
    padded_text = text + _random_string(padding)
    raw_bytes = Fernet(key).encrypt(padded_text.encode())

    return raw_bytes.decode()  # convert to string


def _decrypt(ciphertext: str, key: bytes):
    original_bytes = Fernet(key).decrypt(ciphertext.encode())

    return original_bytes.decode()


def _random_string(length: int):
    return "".join(random.choices(ALPHANUMERIC_CHARS, k=length))
