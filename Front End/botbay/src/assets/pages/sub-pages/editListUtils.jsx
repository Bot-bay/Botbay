import React, { useState, useEffect } from "react";

const schema = {
    motor: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "motor",
        connectorTypes: "",
        maxPower: "",
        stallCurrent: "",
        voltage: "",
        outputShaftLength: "",
        noLoadSpeed: "",
        cpr: "",
        ppr: "",
        stallTorque: "",
        shaftType: "",
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    servo: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "servo",
        // Stats fields
        sizeL: "",
        sizeW: "",
        sizeH: "",
        weight: "",
        speed: "",
        angularRange: "",
        gearMaterial: "",
        splineType: "",
        splineThreadType: "",
        splineInternalDepth: "",
        stallCurrent: "",
        stallTorque: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    structural: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "structural",
        // Stats fields
        sizeL: "",
        sizeW: "",
        sizeH: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    electrical: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "electrical",
        // Stats fields
        capacity: "",
        voltage: "",
        weight: "",
        wireGauge: "",
        sizeL: "",
        sizeW: "",
        sizeH: "",
        connectorTypes: "", // Will be comma-separated
        replaceableFuse: "",
        maxDischarge: "",
        wireLength: "",
        chargeRates: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    sensor: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "sensor",
        // Stats fields
        sensorType: "",
        maxVoltage: "",
        sizeL: "",
        sizeW: "",
        sizeH: "",
        proxMin: "",
        proxMax: "",
        distMin: "",
        distMax: "",
        fov: "",
        imu: "",
        cpr: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    "3d-printed": {
        manufacturerId: "",
        name: "",
        tags: ["3d-printed"],
        manufacturer: "",
        // Stats
        sizeL: "",
        sizeW: "",
        sizeH: "",
        infill: "",
        filament: "",
        wallLoops: "",
        infillPattern: "",
        support: "",
        supportType: "",
        onBuildplateOnly: "",
        removeSmallOverhangs: "",
        thresholdAngle: "",
        brimType: "",
        brimWidth: "",
        brimObjectGap: "",
        filamentAmount: "",
        cost: "",
        timeH: "0",
        timeM: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    machined: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "machined",
        // Stats fields
        sizeL: "",
        sizeW: "",
        sizeH: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
    other: {
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        type: "other",
        // Stats
        description: "",
        // Links
        iconLink: "",
        cadLink: "",
        storeLink: "",
    },
};

export function assembleEditList(typeOfItem) {
    const template = schema[typeOfItem];
    // Return a new object based on the template, or an empty object if not found (basically safety in case we add wheel and forget that we have to actually put it here)
    return template ? { ...template } : {};
}

export function MotorStatList() {
    return null;
}

export function ServoStatList() {
    return null;
}

export function StructuralStatList() {
    return null;
}

export function ElectricalStatList() {
    return null;
}

export function SensorStatList() {
    return null;
}

export function ThreeDPrintedStatList() {
    return null;
}

export function MachinedStatList() {
    return null;
}

export function OtherStatList() {
    return null;
}
