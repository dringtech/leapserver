var Leap = require('leapjs');
var osc = require('osc');

var rejection = 0.2;

var udpPort = new osc.UDPPort({
    // This is where Max/MSP should be listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 57120,
    metadata: true
});

udpPort.open();

var leapOptions = {
  background: true,
  enableGestures: true,
};

Leap.loop( leapOptions, function(frame) {
  frame.hands.sort(function(a, b) {
    return a[0] < b[0];
  }).map(function(hand, index) {
    var msg = {
      address: '/leap/hand/palmPosition',
      args: [
        { type: "f", value: hand.type == "left" ? 0 : 1 },
        { type: "f", value: hand.palmPosition[0] },
        { type: "f", value: hand.palmPosition[2] },
        { type: "f", value: hand.palmPosition[1] },
      ]
    };
    console.log(msg);
    udpPort.send(msg);
  });
});
