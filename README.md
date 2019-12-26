# Zipper-stream-express

Simple Express App to zip URLs on the fly and return a single zip archive. It's mostly used for mass-downloading.

## How does it work?

Well, the code is currently 25 lines long in total so you can check it out, but nothing fancy, the app just pipes things around. It should use much memory (whatever the size of the input is) and doesn't use any temporary storage.

## API

```
GET /zip?urls=[comma],[separated],[list],[of],[urls]
```

And that's it, the download should start immediately. You can also use a POST request for longer url list.

