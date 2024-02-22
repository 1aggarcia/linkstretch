from flask import Flask, redirect
from flask_cors import CORS
from .routes import links_blueprint


app = Flask(__name__)
app.register_blueprint(links_blueprint, url_prefix="/links")
CORS(app)


# This clashes with the static frontend at route "/"

# @app.route("/")
# def root():
#     if app.debug:
#         return "Server Running in Debug Mode"

#     return redirect("https://homes.cs.washington.edu/~apolo/linkstretch/")


# To run: python -m api.main
if __name__ == "__main__":
    app.run(debug=True)
