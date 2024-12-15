"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import BookingCalendar from "./booking-calendar";
import { useCompany } from "@/lib/company-context";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { company } = useCompany();
  const isTech = company === "tech";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl min-h-[80vh] transform overflow-hidden rounded-2xl p-8 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className={`rounded-lg p-2 hover:bg-gray-100/10 transition-colors ${
                      isTech ? "text-gray-400" : "text-gray-600"
                    }`}
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Dialog.Title
                  as="h3"
                  className={`text-2xl font-semibold leading-6 mb-4 ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  Schedule a Call
                </Dialog.Title>
                <BookingCalendar />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
