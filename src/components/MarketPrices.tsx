import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketPrice {
  commodity: string;
  variety: string;
  price: string;
  unit: string;
  location: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

export function MarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Sample data - Replace with actual API call
  const samplePrices: MarketPrice[] = [
    {
      commodity: 'Oyster Mushrooms',
      variety: 'Blue',
      price: '8.00-10.00',
      unit: 'lb',
      location: 'Boston',
      date: '2025-01-27',
      trend: 'up'
    },
    {
      commodity: 'Shiitake Mushrooms',
      variety: 'Fresh',
      price: '12.00-15.00',
      unit: 'lb',
      location: 'New York',
      date: '2025-01-27',
      trend: 'stable'
    },
    {
      commodity: "Lion's Mane",
      variety: 'Fresh',
      price: '14.00-18.00',
      unit: 'lb',
      location: 'Chicago',
      date: '2025-01-27',
      trend: 'down'
    }
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual USDA AMS API call
        // const response = await fetch('https://api.ams.usda.gov/services/v1/...');
        // const data = await response.json();
        
        // Using sample data for now
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setPrices(samplePrices);
        setLastUpdated(new Date());
      } catch (err: any) {
        setError(err.message || 'Failed to fetch market prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getTrendIcon = (trend: MarketPrice['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-amber-900">Market Prices</h2>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-amber-700">
            <RefreshCcw className="w-4 h-4" />
            Last updated: {lastUpdated?.toLocaleString() || 'Never'}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((price, index) => (
              <div key={index} className="bg-amber-50/50 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900">{price.commodity}</h3>
                    <p className="text-amber-700">{price.variety}</p>
                  </div>
                  {getTrendIcon(price.trend)}
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-amber-900">
                    ${price.price}/{price.unit}
                  </p>
                  <p className="text-sm text-amber-700">
                    Market: {price.location}
                  </p>
                  <p className="text-sm text-amber-600">
                    Date: {new Date(price.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-sm text-amber-700">
          <p>* Prices are wholesale market averages and may vary by region and supplier.</p>
        </div>
      </div>
    </section>
  );
}