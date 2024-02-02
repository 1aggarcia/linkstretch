from flask import Flask, redirect
from flask_cors import CORS
from .routes import links_blueprint

MAIN_PAGE = "https://homes.cs.washington.edu/~apolo/restricted/secret/"


app = Flask(__name__)
app.register_blueprint(links_blueprint, url_prefix="/links")
CORS(app)


@app.route("/")
def root():
    if app.debug:
        return "Server Running in Debug Mode"

    return redirect(MAIN_PAGE)


# To run: python -m api.main
if __name__ == "__main__":
    app.run(debug=True)
