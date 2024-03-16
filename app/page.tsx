'use client';
import { useEffect, useState } from 'react';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils';
import Image from 'next/image';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search state
  const [manufacturer, setManuFacturer] = useState('');
  const [model, setModel] = useState('');

  //filter state
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);

  // pagination state
  const [limit, setLimit] = useState(10);

  //fetchCars
  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer.toLowerCase() || '',
        year: year || 2022,
        fuel: fuel.toLowerCase() || '',
        limit: limit || 10,
        model: model.toLowerCase() || '',
      });
      setAllCars(result);
      console.log(result);
    } catch {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
    console.log(fuel, year, manufacturer, limit, model);
  }, [fuel, manufacturer, year, limit, model]);

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar setManufacturer={setManuFacturer} setModel={setModel} />
          <div />
          <div className='home__filter-container z-10'>
            <CustomFilter title='fuel' setFilter={setFuel} options={fuels} />
            <CustomFilter
              title='year'
              setFilter={setYear}
              options={yearsOfProduction}
            />
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className='home__loading mt-16 w-full flex-center'>
                <Image
                  src='/loader.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
