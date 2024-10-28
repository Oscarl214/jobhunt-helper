'use client';

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Toast, toast } from 'react-hot-toast';
interface CloudinaryResult {
  secure_url: string;
}
interface UploadWidgetProps {
  setCover: (url: string) => void;
  setCLWidgetVisible: (isVisible: boolean) => void;
}

const UploadCLWidget: React.FC<UploadWidgetProps> = ({
  setCover,
  setCLWidgetVisible,
}) => {
  return (
    <CldUploadWidget
      uploadPreset="jobhunt"
      onSuccess={(result, widget) => {
        console.log(result);
        if (result.event !== 'success') return;
        const info = result.info as CloudinaryResult;

        setCover(info.secure_url);
        setCLWidgetVisible(false);
        toast.success('Successfully Added Cover Letter');
      }}
    >
      {({ open }) => (
        <button
          className="btn bg-green-400 text-black text-center"
          onClick={() => open()}
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadCLWidget;
