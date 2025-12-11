import os
from pathlib import Path

from flask import Blueprint, current_app, jsonify

bp = Blueprint("conversation", __name__, url_prefix="/api/conversation")


def _get_conversation_file() -> Path:
    base_dir = Path(__file__).resolve().parent.parent
    file_path = base_dir / "instance" / "conversation.txt"
    file_path.parent.mkdir(parents=True, exist_ok=True)
    if not file_path.exists():
        # Seed with a short note so users know where to paste.
        file_path.write_text("Paste your conversation output here.\n", encoding="utf-8")
    return file_path


@bp.route("", methods=["GET"])
def read_conversation_file():
    """Return the contents of the backend conversation text file."""
    try:
        file_path = _get_conversation_file()
        content = file_path.read_text(encoding="utf-8")
        return jsonify({"content": content})
    except Exception as exc:  # pragma: no cover - simple IO guard
        current_app.logger.exception("Failed to read conversation file", exc_info=exc)
        return jsonify({"error": "Unable to read conversation file"}), 500

