import { React } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';

export default function DownLoadForm() {
  return (
    <dd className="mt-2 text-sm text-semiTitle sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-hori rounded-md border border-gray-200"
      >
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">
                resume_back_end_developer.pdf
              </span>
              <span className="flex-shrink-0 text-gray-400">2.4mb</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Download
            </a>
          </div>
        </li>
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">
                coverletter_back_end_developer.pdf
              </span>
              <span className="flex-shrink-0 text-gray-400">4.5mb</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Download
            </a>
          </div>
        </li>
      </ul>
    </dd>
  );
}
