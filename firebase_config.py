import json
import os

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def get_firebase_credentials():
    service_account = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

    if service_account:
        return credentials.Certificate(json.loads(service_account))

    return credentials.Certificate("serviceAccountKey.json")


if not firebase_admin._apps:
    cred = get_firebase_credentials()
    firebase_admin.initialize_app(cred)

db = firestore.client()