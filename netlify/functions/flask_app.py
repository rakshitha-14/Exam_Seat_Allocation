import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from serverless_wsgi import handler
from app import app


def lambda_handler(event, context):
    return handler(app, event, context)
