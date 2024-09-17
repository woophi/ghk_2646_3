import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { SliderInput, SliderInputProps } from '@alfalab/core-components/slider-input';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import car from './assets/car.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { getYearString } from './utils/years';

const min = 10_000;
const max = 200_000;
const step = 1000;
const range: SliderInputProps['range'] = {
  min: [min],
  max: [max],
};
const pips: SliderInputProps['pips'] = {
  mode: 'values',
  values: [min, max],
  format: {
    to: (value: number) => {
      return `${value.toLocaleString('ru')} ₽`;
    },
  },
};

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [selectedYear, setYear] = useState(1);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [value, setValue] = useState<number | string>(20_000);

  const handleInputChange: SliderInputProps['onInputChange'] = (_, { value }) => {
    setValue(typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value);
  };

  const handleSliderChange: SliderInputProps['onSliderChange'] = ({ value }) => {
    setValue(value);
  };

  const numberValue = typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value;
  const handleBlur = () => {
    setValue(Math.max(min, Math.min(max, numberValue)));
  };

  const submit = useCallback(() => {
    // if (!accountNumber) {
    //   setError('Укажите номер лицевого счёта');
    //   return;
    // }
    setLoading(true);
    setThx(true);
    setLoading(false);

    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    // });
  }, []);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={car} />

          <Typography.Title tag="h1" view="medium" font="system" weight="bold">
            Автокредит
          </Typography.Title>
          <Typography.Text view="primary-medium" color="secondary">
            На новый или подержанный автомобиль
          </Typography.Text>
        </div>

        <SliderInput
          block
          value={value.toLocaleString('ru')}
          sliderValue={numberValue}
          onInputChange={handleInputChange}
          onSliderChange={handleSliderChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          range={range}
          pips={pips}
          step={step}
          size={56}
          rightAddons="₽"
          fieldClassName={appSt.slider}
          sliderClassName={appSt.slid}
        />
      </div>

      <Swiper style={{ marginLeft: '1rem' }} spaceBetween={8} slidesPerView="auto">
        {years.map(year => (
          <SwiperSlide
            onClick={() => setYear(year)}
            className={appSt.swSlide({ selected: selectedYear === year })}
            key={year}
          >
            {getYearString(year)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={appSt.container}>
        <div />
        <div className={appSt.row}>
          <Switch
            block
            reversed
            checked={checked}
            label="Страховка"
            className={appSt.switchItem}
            onChange={() => setChecked(prevState => !prevState)}
          />
        </div>
        <div className={appSt.row}>
          <Switch
            block
            reversed
            checked={checked2}
            label="Выгодная ставка"
            className={appSt.switchItem}
            onChange={() => setChecked2(prevState => !prevState)}
          />
        </div>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="primary" className={appSt.btn} onClick={submit} loading={loading}>
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                29 700 ₽
              </Typography.TitleResponsive>
              <Typography.Text view="primary-medium" color="secondary-inverted" defaultMargins={false}>
                Платеж в месяц
              </Typography.Text>
            </div>

            <div className={appSt.btnContainer}>
              <div>
                <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                  13,5%
                </Typography.TitleResponsive>
                <Typography.Text view="primary-medium" color="secondary-inverted" defaultMargins={false}>
                  Ставка
                </Typography.Text>
              </div>
              <CDNIcon name="glyph_chevron-right_m" />
            </div>
          </div>
        </ButtonMobile>
      </div>
    </>
  );
};
