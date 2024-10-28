'use client';

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Toast, toast } from 'react-hot-toast';
interface CloudinaryResult {
  secure_url: string;
}
interface UploadWidgetProps {
  setResume: (url: string) => void;
  setWidgetVisible: (isVisible: boolean) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({
  setResume,
  setWidgetVisible,
}) => {
  return (
    <CldUploadWidget
      uploadPreset="jobhunt"
      onSuccess={(result, widget) => {
        console.log(result);
        if (result.event !== 'success') return;
        const info = result.info as CloudinaryResult;

        setResume(info.secure_url);
        setWidgetVisible(false);
        toast.success('Successfully Added Resume');
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

export default UploadWidget;
