import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

export const megaSchema = {
    // Basic Info (Shared by all)
    id: null,
    type: "",
    name: "",
    manufacturer: "",
    manufacturerId: "",
    tags: [],

    // Links (Shared by all)
    iconLink: "",
    cadLink: "",
    storeLink: "",

    // Physical Stats (Dimensions & Weight)
    sizeL: "",
    sizeW: "",
    sizeH: "",
    weight: "",

    // Motor & Servo Specific
    connectorTypes: "", // Used by Motor and Electrical
    voltage: "", // Used by Motor, Electrical, and Sensor
    maxPower: "",
    stallCurrent: "", // Used by Motor and Servo
    stallTorque: "", // Used by Motor and Servo
    noLoadSpeed: "",
    outputShaftLength: "",
    shaftType: "",
    cpr: "", // Used by Motor and Sensor
    ppr: "",
    speed: "",
    angularRange: "",
    gearMaterial: "",
    splineType: "",
    splineThreadType: "",
    splineInternalDepth: "",

    // Electrical Specific
    capacity: "",
    wireGauge: "",
    replaceableFuse: "",
    maxDischarge: "",
    wireLength: "",
    chargeRates: "",

    // Sensor Specific
    sensorType: "",
    maxVoltage: "",
    proxMin: "",
    proxMax: "",
    distMin: "",
    distMax: "",
    fov: "",
    imu: "",

    // 3D Printing Specific
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

    // Miscellaneous
    description: "", // From 'other'
};

export function assembleEditList(typeOfItem) {
    const template = schema[typeOfItem];
    // Return a new object based on the template, or an empty object if not found (basically safety in case we add wheel and forget that we have to actually put it here)
    return template ? { ...template } : {};
}

export function MotorStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    const textLimit = 150;
    const trigger = 130;

    const renderTextInput = (name, label, placeholder = "") => {
        const val = formData[name] || "";
        const showCounter = val.length >= trigger;

        return (
            <div className="d-createitem-input-group">
                <label>{label}</label>
                <div style={{ position: "relative", width: "100%" }}>
                    <input
                        name={name}
                        placeholder={placeholder}
                        value={val}
                        onChange={(e) => {
                            const sliced = e.target.value.slice(0, textLimit);
                            handleChange({ target: { name, value: sliced } });
                        }}
                        style={{
                            width: "100%",
                            paddingRight: showCounter
                                ? isPhone
                                    ? "100px"
                                    : "45px"
                                : "10px",
                        }}
                    />
                    {showCounter && (
                        <p
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: 0,
                                fontSize: isPhone ? "2.5rem" : "0.8rem",
                                color: "#ef4444",
                                pointerEvents: "none",
                            }}
                        >
                            {textLimit - val.length}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>

            {renderTextInput(
                "connectorTypes",
                t("connectortypescommaseparated"),
                "JST-VH-2, Anderson Powerpoles",
            )}

            <div className="d-createitem-input-group">
                <label>{t("maxpowerw")}</label>
                <input
                    type="number"
                    max={99999}
                    name="maxPower"
                    value={formData.maxPower ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("stallcurrenta")}</label>
                <input
                    type="number"
                    max={99999}
                    name="stallCurrent"
                    value={formData.stallCurrent ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("voltagev")}</label>
                <input
                    type="number"
                    max={99999}
                    name="voltage"
                    value={formData.voltage ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("outputshaftlengthmm")}</label>
                <input
                    type="number"
                    max={99999}
                    name="outputShaftLength"
                    value={formData.outputShaftLength ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("noloadspeedrpm")}</label>
                <input
                    type="number"
                    max={99999}
                    name="noLoadSpeed"
                    value={formData.noLoadSpeed ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("countsperrevolution")}</label>
                <input
                    type="number"
                    max={99999}
                    name="cpr"
                    value={formData.cpr ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("pulsesperrevolution")}</label>
                <input
                    type="number"
                    max={99999}
                    name="ppr"
                    value={formData.ppr ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("stalltorquenm")}</label>
                <input
                    type="number"
                    max={99999}
                    name="stallTorque"
                    value={formData.stallTorque ?? ""}
                    onChange={handleChange}
                />
            </div>

            {renderTextInput("shaftType", t("shafttype"))}

            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function ServoStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    const textLimit = 150;
    const trigger = 130;

    const renderTextInput = (name, label, placeholder = "") => {
        const val = formData[name] || "";
        const showCounter = val.length >= trigger;

        return (
            <div className="d-createitem-input-group">
                <label>{label}</label>
                <div style={{ position: "relative", width: "100%" }}>
                    <input
                        name={name}
                        placeholder={placeholder}
                        value={val}
                        onChange={(e) => {
                            const sliced = e.target.value.slice(0, textLimit);
                            handleChange({ target: { name, value: sliced } });
                        }}
                        style={{
                            width: "100%",
                            paddingRight: showCounter
                                ? isPhone
                                    ? "100px"
                                    : "45px"
                                : "10px",
                        }}
                    />
                    {showCounter && (
                        <p
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: 0,
                                fontSize: isPhone ? "2.5rem" : "0.8rem",
                                color: "#ef4444",
                                pointerEvents: "none",
                            }}
                        >
                            {textLimit - val.length}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>

            <div className="d-createitem-input-group">
                <label>{t("sizelwhmm")}</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="number"
                        step="0.1"
                        max={99999}
                        name="sizeL"
                        placeholder={t("l")}
                        value={formData.sizeL ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="0.1"
                        max={99999}
                        name="sizeW"
                        placeholder={t("w")}
                        value={formData.sizeW ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="0.1"
                        max={99999}
                        name="sizeH"
                        placeholder={t("h")}
                        value={formData.sizeH ?? ""}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="d-createitem-input-group">
                <label>{t("weightg")}</label>
                <input
                    type="number"
                    step="0.01"
                    max={99999}
                    name="weight"
                    value={formData.weight ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("speedsec60")}</label>
                <input
                    type="number"
                    step="0.01"
                    max={99999}
                    name="speed"
                    value={formData.speed ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("angularrange")}</label>
                <input
                    type="number"
                    max={99999}
                    name="angularRange"
                    value={formData.angularRange ?? ""}
                    onChange={handleChange}
                />
            </div>

            {renderTextInput("gearMaterial", t("gearmaterial"), "e.g. metal")}
            {renderTextInput("splineType", t("splinetype"), "e.g. 25T")}
            {renderTextInput(
                "splineThreadType",
                t("splinethreadtype"),
                "e.g. M3",
            )}

            <div className="d-createitem-input-group">
                <label>{t("splineinternaldepthmm")}</label>
                <input
                    type="number"
                    max={99999}
                    name="splineInternalDepth"
                    value={formData.splineInternalDepth ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("stallcurrenta")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="stallCurrent"
                    value={formData.stallCurrent ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("stalltorquenm")}</label>
                <input
                    type="number"
                    step="0.01"
                    max={99999}
                    name="stallTorque"
                    value={formData.stallTorque ?? ""}
                    onChange={handleChange}
                />
            </div>

            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function StructuralStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>

            <div className="d-createitem-input-group">
                <label>{t("lengthmm")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="sizeL"
                    placeholder={t("structuralstatex1")}
                    value={formData?.sizeL ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("widthmm")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="sizeW"
                    placeholder={t("structuralstatex2")}
                    value={formData?.sizeW ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("heightmm")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="sizeH"
                    placeholder={t("structuralstatex3")}
                    value={formData?.sizeH ?? ""}
                    onChange={handleChange}
                />
            </div>

            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function ElectricalStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    const textLimit = 150;
    const trigger = 130;

    const renderTextInput = (name, label, placeholder = "") => {
        const val = formData?.[name] || "";
        const showCounter = val.length >= trigger;

        return (
            <div className="d-createitem-input-group">
                <label>{label}</label>
                <div style={{ position: "relative", width: "100%" }}>
                    <input
                        name={name}
                        placeholder={placeholder}
                        value={val}
                        onChange={(e) => {
                            const sliced = e.target.value.slice(0, textLimit);
                            handleChange({ target: { name, value: sliced } });
                        }}
                        style={{
                            width: "100%",
                            paddingRight: showCounter
                                ? isPhone
                                    ? "100px"
                                    : "45px"
                                : "10px",
                        }}
                    />
                    {showCounter && (
                        <p
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: 0,
                                fontSize: isPhone ? "2.5rem" : "0.8rem",
                                color: "#ef4444",
                                pointerEvents: "none",
                            }}
                        >
                            {textLimit - val.length}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>

            {renderTextInput(
                "connectorTypes",
                t("connectortypes"),
                t("electricalstatex0"),
            )}

            <div className="d-createitem-input-group">
                <label>{t("voltage")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="voltage"
                    placeholder={t("electricalstatex1")}
                    value={formData?.voltage ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("capacity")}</label>
                <input
                    type="number"
                    max={99999}
                    name="capacity"
                    placeholder={t("electricalstatex2")}
                    value={formData?.capacity ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("wiregauge")}</label>
                <input
                    type="number"
                    max={99999}
                    name="wireGauge"
                    placeholder={t("electricalstatex3")}
                    value={formData?.wireGauge ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("wirelength")}</label>
                <input
                    type="number"
                    max={99999}
                    name="wireLength"
                    placeholder={t("electricalstatex4")}
                    value={formData?.wireLength ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("maxdischarge")}</label>
                <input
                    type="number"
                    max={99999}
                    name="maxDischarge"
                    placeholder={t("electricalstatex5")}
                    value={formData?.maxDischarge ?? ""}
                    onChange={handleChange}
                />
            </div>

            {renderTextInput(
                "replaceableFuse",
                t("replaceablefuse"),
                t("electricalstatex6"),
            )}
            {renderTextInput(
                "chargeRates",
                t("chargerates"),
                t("electricalstatex7"),
            )}

            <div className="d-createitem-input-group">
                <label>{t("weightg")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="weight"
                    placeholder={t("electricalstatex8")}
                    value={formData?.weight ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("sizelwhmm")}</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="number"
                        max={99999}
                        name="sizeL"
                        placeholder={t("l")}
                        value={formData?.sizeL ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="sizeW"
                        placeholder={t("w")}
                        value={formData?.sizeW ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="sizeH"
                        placeholder={t("h")}
                        value={formData?.sizeH ?? ""}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function SensorStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    const textLimit = 150;
    const trigger = 130;

    const renderTextInput = (name, label, placeholder = "") => {
        const val = formData?.[name] || "";
        const showCounter = val.length >= trigger;

        return (
            <div className="d-createitem-input-group">
                <label>{label}</label>
                <div style={{ position: "relative", width: "100%" }}>
                    <input
                        name={name}
                        placeholder={placeholder}
                        value={val}
                        onChange={(e) => {
                            const sliced = e.target.value.slice(0, textLimit);
                            handleChange({ target: { name, value: sliced } });
                        }}
                        style={{
                            width: "100%",
                            paddingRight: showCounter
                                ? isPhone
                                    ? "100px"
                                    : "45px"
                                : "10px",
                        }}
                    />
                    {showCounter && (
                        <p
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: 0,
                                fontSize: isPhone ? "2.5rem" : "0.8rem",
                                color: "#ef4444",
                                pointerEvents: "none",
                            }}
                        >
                            {textLimit - val.length}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>

            {renderTextInput("sensorType", t("sensortype"), t("sensorstatex1"))}

            <div className="d-createitem-input-group">
                <label>{t("voltage")}</label>
                <input
                    type="number"
                    step="0.1"
                    max={99999}
                    name="maxVoltage"
                    placeholder={t("sensorstatex2")}
                    value={formData?.maxVoltage ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("proximityrange")}</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="number"
                        max={99999}
                        name="proxMin"
                        value={formData.proxMin}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="proxMax"
                        value={formData.proxMax}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="d-createitem-input-group">
                <label>{t("distancerange")}</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="number"
                        max={99999}
                        name="distMin"
                        value={formData.distMin}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="distMax"
                        value={formData.distMax}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="d-createitem-input-group">
                <label>{t("fov")}</label>
                <input
                    type="number"
                    max={99999}
                    name="fov"
                    placeholder={t("sensorstatex3")}
                    value={formData?.fov ?? ""}
                    onChange={handleChange}
                />
            </div>

            {renderTextInput("imu", t("imu"), t("sensorstatex4"))}

            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function ThreeDPrintedStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    const textLimit = 150;
    const trigger = 130;

    const renderTextInput = (name, label, placeholder = "") => {
        const val = formData?.[name] || "";
        const showCounter = val.length >= trigger;

        return (
            <div className="d-createitem-input-group">
                <label>{label}</label>
                <div style={{ position: "relative", width: "100%" }}>
                    <input
                        name={name}
                        placeholder={placeholder}
                        value={val}
                        onChange={(e) => {
                            const sliced = e.target.value.slice(0, textLimit);
                            handleChange({ target: { name, value: sliced } });
                        }}
                        style={{
                            width: "100%",
                            paddingRight: showCounter
                                ? isPhone
                                    ? "100px"
                                    : "45px"
                                : "10px",
                        }}
                    />
                    {showCounter && (
                        <p
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: 0,
                                fontSize: isPhone ? "2.5rem" : "0.8rem",
                                color: "#ef4444",
                                pointerEvents: "none",
                            }}
                        >
                            {textLimit - val.length}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("slicingstats")}</h4>

            <div className="d-createitem-input-group">
                <label>{t("sizelwhmm")}</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="number"
                        max={99999}
                        name="sizeL"
                        placeholder={t("l")}
                        value={formData?.sizeL ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="sizeW"
                        placeholder={t("w")}
                        value={formData?.sizeW ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="sizeH"
                        placeholder={t("h")}
                        value={formData?.sizeH ?? ""}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {renderTextInput("filament", t("filament"), t("3dprintstatex1"))}
            <div className="d-createitem-input-group">
                <label>{t("infill")}</label>
                <input
                    type="number"
                    max={99999}
                    name="infill"
                    placeholder={t("3dprintstatex2")}
                    value={formData?.infill ?? ""}
                    onChange={handleChange}
                />
            </div>
            {renderTextInput(
                "infillPattern",
                t("infillpattern"),
                t("3dprintstatex3"),
            )}
            <div className="d-createitem-input-group">
                <label>{t("wallloops")}</label>
                <input
                    type="number"
                    max={99999}
                    name="wallLoops"
                    placeholder={t("3dprintstatex4")}
                    value={formData?.wallLoops ?? ""}
                    onChange={handleChange}
                />
            </div>

            <hr className="d-createitem-form-divider" />
            <h4 className="d-createitem-form-subtitle2">{t("supports")}</h4>

            <div className="d-createitem-input-group">
                <label>{t("supports")}</label>
                <select
                    name="support"
                    value={formData?.support ?? "false"}
                    onChange={handleChange}
                >
                    <option value="false">{t("no")}</option>
                    <option value="true">{t("yes")}</option>
                </select>
            </div>

            {renderTextInput(
                "supportType",
                t("supporttype"),
                t("3dprintstatex5"),
            )}

            <div className="d-createitem-input-group">
                <label>{t("onbuildplateonly")}</label>
                <select
                    name="onBuildplateOnly"
                    value={formData?.onBuildplateOnly ?? "false"}
                    onChange={handleChange}
                >
                    <option value="false">{t("no")}</option>
                    <option value="true">{t("yes")}</option>
                </select>
            </div>

            <div className="d-createitem-input-group">
                <label>{t("removesmalloverhangs")}</label>
                <select
                    name="removeSmallOverhangs"
                    value={formData?.removeSmallOverhangs ?? "false"}
                    onChange={handleChange}
                >
                    <option value="false">{t("no")}</option>
                    <option value="true">{t("yes")}</option>
                </select>
            </div>

            <div className="d-createitem-input-group">
                <label>{t("thresholdangle")}</label>
                <input
                    type="number"
                    max={99999}
                    name="thresholdAngle"
                    placeholder={t("3dprintstatex6")}
                    value={formData?.thresholdAngle ?? ""}
                    onChange={handleChange}
                />
            </div>

            {renderTextInput("brimType", t("brimtype"), t("3dprintstatex7"))}

            <div className="d-createitem-input-group">
                <label>{t("brimwidth")}</label>
                <input
                    type="number"
                    max={99999}
                    name="brimWidth"
                    placeholder={t("3dprintstatex8")}
                    value={formData?.brimWidth ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("brimobjectgap")}</label>
                <input
                    type="number"
                    max={99999}
                    name="brimObjectGap"
                    value={formData?.brimObjectGap ?? ""}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("filamentamount")}</label>
                <input
                    type="number"
                    max={99999}
                    step="0.01"
                    name="filamentAmount"
                    value={formData?.filamentAmount}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("cost")}</label>
                <input
                    type="number"
                    max={99999}
                    step="0.01"
                    name="cost"
                    value={formData?.cost}
                    onChange={handleChange}
                />
            </div>

            <div className="d-createitem-input-group">
                <label>{t("time")}</label>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type="number"
                        max={99999}
                        name="timeH"
                        value={formData?.timeH}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        max={99999}
                        name="timeM"
                        value={formData?.timeM}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function MachinedStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>
            <div className="d-createitem-input-group">
                <label>{t("lengthmm")}</label>
                <input
                    type="number"
                    step="0.001"
                    max={99999}
                    name="sizeL"
                    placeholder={t("0.000")}
                    value={formData?.sizeL ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className="d-createitem-input-group">
                <label>{t("widthmm")}</label>
                <input
                    type="number"
                    step="0.001"
                    max={99999}
                    name="sizeW"
                    placeholder={t("0.000")}
                    value={formData?.sizeW ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className="d-createitem-input-group">
                <label>{t("thicknessmm")}</label>
                <input
                    type="number"
                    step="0.001"
                    max={99999}
                    name="sizeH"
                    placeholder={t("0.000")}
                    value={formData?.sizeH ?? ""}
                    onChange={handleChange}
                />
            </div>
            <hr className="d-createitem-form-divider" />
        </>
    );
}

export function OtherStatList({ handleChange, formData, isPhone }) {
    const { t } = useTranslation();
    const textLimit = 150;
    const trigger = 130;
    const val = formData?.description || "";
    const showCounter = val.length >= trigger;

    return (
        <>
            <h4 className="d-createitem-form-subtitle2">{t("stats")}</h4>
            <div className="d-createitem-input-group">
                <label>{t("description")}</label>
                <div style={{ position: "relative", width: "100%" }}>
                    <input
                        name="description"
                        placeholder={t("additionaldetails")}
                        value={val}
                        onChange={(e) => {
                            const sliced = e.target.value.slice(0, textLimit);
                            handleChange({
                                target: { name: "description", value: sliced },
                            });
                        }}
                        style={{
                            width: "100%",
                            paddingRight: showCounter
                                ? isPhone
                                    ? "100px"
                                    : "45px"
                                : "10px",
                        }}
                    />
                    {showCounter && (
                        <p
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                margin: 0,
                                fontSize: isPhone ? "2.5rem" : "0.8rem",
                                color: "#ef4444",
                                pointerEvents: "none",
                            }}
                        >
                            {textLimit - val.length}
                        </p>
                    )}
                </div>
            </div>
            <hr className="d-createitem-form-divider" />
        </>
    );
}
