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
    # use only the first `length ` characters of the decoded url
    return _decrypt(ciphertext, key)[:length]


def is_url(text: str):
    try:
        # use library function to split text as if it were a URL
        parsed = urllib.parse.urlparse(text)
        # check that the first two parts <scheme>://<netloc> are there
        return all([parsed.scheme, parsed.netloc])
    except ValueError:
        return False


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
    # TODO: don't pad very long strings
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