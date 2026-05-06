/**
 * About Page
 */
import { useEffect, useState } from 'react';

export default function About() {
  const sliderImages = [
    {
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80',
      alt: 'Donor handing food packages to NGO volunteers',
      title: 'Donors Share Fresh Food',
      subtitle: 'Restaurants and households donate surplus meals to verified NGOs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1400&q=80',
      alt: 'NGO volunteers sorting donated meals',
      title: 'NGOs Organize Distribution',
      subtitle: 'Collected donations are sorted and prepared for quick delivery.',
    },
    {
      src: 'https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&w=1400&q=80',
      alt: 'Food boxes being distributed to people in need',
      title: 'Meals Reach Communities',
      subtitle: 'Together, we reduce food waste and support families in need.',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">About Food4All</h1>

        <div className="relative mb-10 overflow-hidden rounded-2xl shadow-xl">
          <img
            src={sliderImages[currentSlide].src}
            alt={sliderImages[currentSlide].alt}
            className="h-[360px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-semibold mb-1">{sliderImages[currentSlide].title}</h2>
            <p className="text-sm md:text-base text-white/90">{sliderImages[currentSlide].subtitle}</p>
          </div>

          <button
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
          >
            &#10094;
          </button>
          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
          >
            &#10095;
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            Food4All is a food donation and redistribution platform that connects food donors
            (restaurants, individuals, event organizers) with NGOs and shelters to reduce
            food wastage while feeding those in need.
          </p>
          <p>
            Our platform makes it easy for donors to list excess food and for NGOs to discover
            and request available donations. With a simple, transparent process, we ensure that
            good food reaches people who need it most.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 pt-8">Our Mission</h2>
          <p>
            To reduce food waste and hunger by creating a seamless connection between those who
            have surplus food and those who can distribute it to people in need.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 pt-8">Our Vision</h2>
          <p>
            A world where no edible food goes to waste and every person has access to nutritious
            meals. Food4All aims to be the leading platform for food donation management.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 pt-8">Contact</h2>
          <p>
            For partnership inquiries or support, please visit our{' '}
            <a href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">Contact</a> page.
          </p>
        </div>
      </div>
    </div>
  );
}
