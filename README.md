# pixi-mousewheel - Plugin for pixi.js

# About

This plugin for pixi.js automatically dispatches mousewheel scroll events for pixi display-objects. It only fires the event for objects that are interactive and have a special flag set. When scrolling a said display-object, the default document scroll is being blocked. Additionally, it normalizes the mousewheel delta for cross-browser consistency.

# Demo
[Simple text scroll usage example](http://manuelotto.com/opensource/pixi-mousewheel/demos/demo.html)

# Documentation
To enable mousewheel events for any display-object, set the `interactiveMousewheel` flag on it to `true`.
The `mousewheel` event will be dispatched via the [standard pixi EventEmitter](http://pixijs.download/dev/docs/PIXI.utils.EventEmitter.html).

    displayObject.interactiveMousewheel = true
    displayObject.on('mousewheel', (delta, event) => {
        myOtherDisplayObject.y += delta * 100
    })

The `delta` is the amount of scrolling normalized to [-1,1].
The `event` is the native DOM `mousewheel` event. Use this if you need the raw data.

# Installing
Include the `dist/pixi-mousewheel.js` or `dist/pixi-mousewheel.min.js` in your html document after pixi.js.
