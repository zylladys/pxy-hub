from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes
)

from telegram import Update

from .database import SessionLocal
from .models import Record

TOKEN = "8788789840:AAFwQt_e4YqoiyD_bMX6XjNyebzAItyE0SM"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Bot online!")

async def addrecord(update: Update, context: ContextTypes.DEFAULT_TYPE):

    try:
        plague = context.args[0]
        difficulty = context.args[1]
        score = int(context.args[2])

        db = SessionLocal()

        new_record = Record(
            plague=plague,
            difficulty=difficulty,
            score=score
        )

        db.add(new_record)
        db.commit()

        await update.message.reply_text(
            f"Recorde salvo!\n"
            f"Praga: {plague}\n"
            f"Dificuldade: {difficulty}\n"
            f"Score: {score}"
        )

    except:
        await update.message.reply_text(
            "Uso:\n"
            "/addrecord Virus Brutal 500000"
        )

app = ApplicationBuilder().token(TOKEN).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("addrecord", addrecord))

app.run_polling()