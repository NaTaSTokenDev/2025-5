import React, { useState } from 'react';
import { Calculator, Brain, Clock, Thermometer, Droplets } from 'lucide-react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface EstimatorFormData {
  species: string;
  substrate: string;
  temperature: number;
  humidity: number;
  containerSize: number;
  grainType: string;
}

export function ColonizationEstimator() {
  const [formData, setFormData] = useState<EstimatorFormData>({
    species: '',
    substrate: '',
    temperature: 75,
    humidity: 90,
    containerSize: 1,
    grainType: ''
  });

  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAIEstimate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const prompt = `
        Please estimate the colonization time for mushroom cultivation with the following parameters:
        - Species: ${formData.species}
        - Substrate: ${formData.substrate}
        - Temperature: ${formData.temperature}°F
        - Humidity: ${formData.humidity}%
        - Container Size: ${formData.containerSize} quarts
        - Grain Type: ${formData.grainType}

        Provide a detailed estimate with a range and explanation of factors affecting colonization time.
        Format the response in a clear, concise way.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a mycology expert specializing in mushroom cultivation. Provide accurate colonization time estimates based on given parameters."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      setEstimate(response.choices[0].message.content);
    } catch (err: any) {
      setError(err.message || 'Failed to get estimate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-amber-900">Colonization Time Estimator</h2>
        </div>

        <div className="bg-amber-50/50 rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Mushroom Species
              </label>
              <input
                type="text"
                value={formData.species}
                onChange={e => setFormData(prev => ({ ...prev, species: e.target.value }))}
                placeholder="e.g., Blue Oyster, Lion's Mane"
                className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Substrate Type
              </label>
              <input
                type="text"
                value={formData.substrate}
                onChange={e => setFormData(prev => ({ ...prev, substrate: e.target.value }))}
                placeholder="e.g., Hardwood Sawdust, Straw"
                className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Temperature (°F)
              </label>
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 text-amber-600 mr-2" />
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={e => setFormData(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  min="50"
                  max="90"
                  className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Humidity (%)
              </label>
              <div className="flex items-center">
                <Droplets className="w-5 h-5 text-amber-600 mr-2" />
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={e => setFormData(prev => ({ ...prev, humidity: Number(e.target.value) }))}
                  min="0"
                  max="100"
                  className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Container Size (quarts)
              </label>
              <input
                type="number"
                value={formData.containerSize}
                onChange={e => setFormData(prev => ({ ...prev, containerSize: Number(e.target.value) }))}
                min="0.5"
                step="0.5"
                className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Grain Type
              </label>
              <input
                type="text"
                value={formData.grainType}
                onChange={e => setFormData(prev => ({ ...prev, grainType: e.target.value }))}
                placeholder="e.g., Rye Berries, Millet"
                className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={getAIEstimate}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Get AI Estimate
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {estimate && (
            <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-900">Estimated Colonization Time</h3>
              </div>
              <p className="text-amber-800 whitespace-pre-line">{estimate}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-amber-700">
          <p className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI-powered estimates are based on typical conditions and may vary based on actual circumstances.
          </p>
        </div>
      </div>
    </section>
  );
}