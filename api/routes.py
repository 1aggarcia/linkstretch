from flask import Blueprint, redirect, request, jsonify
from .linkgen import generate_url, decode_url, is_url

MAX_LEN = 1000


links_blueprint = Blueprint('links_blueprint', __name__)

# GET methods

@links_blueprint.route("/count", methods=["GET"])
def count():
    return "ERROR: No count avaliable", 500


@links_blueprint.route("/navigate", methods=["GET"])
def navigate():
    # validate arguments
    key = request.args.get("key")
    if key is None:
        return 'BAD REQUEST: Missing param "key"', 400

    length = request.args.get("length")
    if length is None:
        return 'BAD REQUEST: Missing param "length"', 400

    ciphertext = request.args.get("ciphertext")
    if ciphertext is None:
        return 'BAD REQUEST: Missing param "ciphertext"', 400

    # decode the link with given arguments, catch any errors
    try:
        shortlink = decode_url(ciphertext, int(length), key.encode())
    except ValueError:
        return "BAD REQUEST: Link improperly encoded", 400

    if not is_url(shortlink):
        return "BAD REQUEST: Link points to an invalid URL", 400

    return redirect(shortlink)


# POST methods

@links_blueprint.route("/create", methods=["POST"])
def create():
    if not request.is_json:
        return "BAD REQUEST: JSON expected", 400

    body = request.get_json()
    shortlink = body.get("shortlink")

    # validate shortlink
    if shortlink is None:
        return 'BAD REQUEST: Missing body param "shortlink"', 400
    if not isinstance(shortlink, str):
        return 'BAD REQUEST: param "shortlink" is not a string', 400
    if len(shortlink) > MAX_LEN:
        return 'BAD REQUEST: param "shortlink" is too long', 400
    if not is_url(shortlink):
        return 'BAD REQUEST: param "shortlink" is not a URL', 400

    return jsonify({
        "url":  request.host + generate_url(shortlink),
    })
