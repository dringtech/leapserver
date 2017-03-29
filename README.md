# leapserver

A simple node.js server which reads leap hand positions and sends as vectors
to an OSC udp port. This can then be read by any software that can read
OSC.

The OSC Port opens on 57120, bound to the `localhost`.

The message is as follows:

    /leap/hand/position <l/r> <x> <y> <z>

The fields are:

* l/r is 0 for left, 1 for right.
* x, y, z are the left/right, front/back and up/down dimensions.
