// app/dashboard/page.js
"use client";

import React from "react";
import SettingOver from "@/components/SettingOver";
import SetOptions from "@/components/SetOptions";

import "@/styles/setting.css";

function Setting() {
  return (
    <div className="setting-page">
      <div className="listSettings">
          <SettingOver />
      </div>
      <div className="listOptions">
      <SetOptions />
      </div>
    </div>
  );
}

export default Setting;
