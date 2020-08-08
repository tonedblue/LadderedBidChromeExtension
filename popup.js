// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let calculate = document.getElementById('calculate');

calculate.onclick = function() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    let max = document.getElementById('max_price').value;
    let min = document.getElementById('min_price').value;
    let bids = document.getElementById('bids').value;

    if (isNaN(max) || max == '') {
        document.getElementById("error").innerHTML = "Max Price is not a valid input";
        return;
    } else if (isNaN(min) || min == '') {
        document.getElementById("error").innerHTML = "Min Price is not a valid input";
        return;
    } else if (isNaN(bids) || bids == '') {
        document.getElementById("error").innerHTML = "Bids is not a valid input";
        return;
    } else if (Number(bids) < 3) {
        document.getElementById("error").innerHTML = "Bids should be a number bigger than 2";
        return;
    } else if (Number(max) <= Number(min)) {
        document.getElementById("error").innerHTML = "Max should be bigger than min";
        return;
    }

    let bidRange = range(Number(min), Number(max), Number(bids));
    print(bidRange);
};

function range(min, max, bids) {
    let step = (max - min) / (bids - 1);
    let range = [min];

    for (var i = 1; i < bids - 1; i++) {
        var next = range[i - 1];
        range.push(next + step);
    }
    range.push(max);
    return range;
}

function print(bidRange) {
    let result = "";
    let decimalPlaces = getDecimalPlaces(bidRange[0]);

    for (var i = bidRange.length - 1; i >= 0; i--) {
        result += bidRange[i].toFixed(decimalPlaces) + "<br />";
    }
    document.getElementById("result").innerHTML = result;
}

function getDecimalPlaces(number) {
    let fallback = 2;
    if (Math.floor(number) !== number) {
        return number.toString().split(".")[1].length || fallback;
    }
    return fallback;
}