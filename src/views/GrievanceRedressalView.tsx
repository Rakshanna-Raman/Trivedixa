import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ComplaintCategory } from '../types';

export const GrievanceRedressalView: React.FC = () => {
  const { navigateTo, submitComplaint } = useApp();
  const [category, setCategory] = useState<ComplaintCategory | ''>('');
  const [description, setDescription] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEvidenceFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setError('Please select a complaint category');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a description of the issue');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitComplaint(
        category as ComplaintCategory,
        description,
        previewUrl || undefined
      );
      setIsSubmitting(false);
      alert('Complaint submitted successfully! You can track progress in the Booking History / Status tab.');
      navigateTo('booking_history');
    }, 1500);
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 pb-24 font-sans">
      <main className="pt-6 px-5 max-w-2xl mx-auto w-full flex-grow">
        {/* Header Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-[#610000] mb-1">Grievance Redressal</h2>
          <p className="text-sm text-[#6c5a5a]">
            Submit your complaints regarding Ration Card services, FPS shops, or food grain quality.
          </p>
        </section>

        {error && (
          <div className="p-3 mb-4 text-xs text-red-800 bg-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Complaint Form Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#5a403c]" htmlFor="category">
                Complaint Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full appearance-none bg-[#fff0f0] border border-[#e3beb8] rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#8b0000] focus:border-[#610000] transition-all text-sm"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="quality">Quality Issue (Food Grains)</option>
                  <option value="delivery">Delayed Delivery</option>
                  <option value="behavior">Staff Behavior</option>
                  <option value="overcharging">Overcharging / Weights</option>
                  <option value="card_issue">Ration Card Processing</option>
                  <option value="fps_closed">FPS Shop Closed during hours</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            {/* Description Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#5a403c]" htmlFor="description">
                Description of Complaint
              </label>
              <textarea
                id="description"
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed information about the issue..."
                className="w-full bg-[#fff0f0] border border-[#e3beb8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8b0000] focus:border-[#610000] transition-all text-sm resize-none"
              ></textarea>
            </div>

            {/* Evidence Upload Placeholder */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#5a403c]">
                Evidence (Optional)
              </label>
              <div className="relative group">
                <input
                  id="evidence"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="evidence"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#e3beb8] rounded-xl bg-[#fff0f0] hover:bg-red-50 hover:border-[#8b0000] transition-all cursor-pointer p-4 text-center"
                >
                  <span className="material-symbols-outlined text-4xl text-gray-500 mb-1 group-hover:text-[#8b0000]">
                    upload_file
                  </span>
                  <p className="text-xs font-semibold text-[#5a403c]">
                    {evidenceFile ? evidenceFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">JPG, PNG (Max. 5MB)</p>
                </label>

                {previewUrl && (
                  <div className="mt-3 rounded-xl overflow-hidden h-40 border border-gray-200">
                    <img
                      src={previewUrl}
                      alt="Evidence Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-1/2 bg-[#8b0000] text-white font-bold py-4 px-6 rounded-xl hover:bg-red-900 shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Complaint</span>
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigateTo('citizen_dashboard')}
                className="w-full sm:w-1/2 bg-white text-gray-600 font-semibold py-4 px-6 rounded-xl border border-[#e3beb8] hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Informational Notice */}
        <div className="mt-6 bg-[#f2dada] p-4 rounded-xl flex gap-3 items-start border border-red-200">
          <span
            className="material-symbols-outlined text-[#8b0000] mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            info
          </span>
          <p className="text-xs text-[#534343] leading-relaxed">
            Your complaint will be registered and a unique Tracking ID will be generated. The typical resolution time is 3-5 working days. You can monitor the progress in the 'Status' tab.
          </p>
        </div>
      </main>
    </div>
  );
};
