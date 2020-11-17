CREATE TABLE emails (
    id serial PRIMARY KEY,
    sender text,
    recipient text,
    subject text, 
    message text,
    date text
)