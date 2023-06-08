// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ButtonPrimaryInvert, ModalPadding } from '@polkadotcloud/core-ui';
import { planckToUnit, unitToPlanck } from '@polkadotcloud/utils';
import BigNumber from 'bignumber.js';
import { useApi } from 'contexts/Api';
import { useConnect } from 'contexts/Connect';
import { useModal } from 'contexts/Modal';
import { useTransferOptions } from 'contexts/TransferOptions';
import { CardHeaderWrapper } from 'library/Card/Wrappers';
import { Close } from 'library/Modal/Close';
import { WithSliderWrapper } from 'modals/ManagePool/Wrappers';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const UpdateReserve = () => {
  const { t } = useTranslation('modals');
  const {
    network: { units, unit },
    consts,
  } = useApi();
  const { network } = useApi();
  const { setStatus } = useModal();
  const { reserve, setReserve } = useTransferOptions();
  const { activeAccount, accountHasSigner } = useConnect();
  const { existentialDeposit } = consts;

  const minReserve = planckToUnit(existentialDeposit, units);
  const maxReserve = minReserve.plus(
    ['polkadot', 'westend'].includes(network.name) ? 3 : 1
  );

  const [sliderReserve, setSliderReserve] = useState<number>(
    planckToUnit(reserve, units).plus(minReserve).decimalPlaces(3).toNumber()
  );

  const sliderProps = {
    trackStyle: {
      backgroundColor: 'var(--network-color-primary)',
    },
    handleStyle: {
      backgroundColor: 'var(--background-primary)',
      borderColor: 'var(--network-color-primary)',
      opacity: 1,
    },
  };

  const handleChange = (val: BigNumber) => {
    // deduct ED from reserve amount.
    val = val.decimalPlaces(3);
    const actualReserve = val.minus(minReserve).toNumber();
    const actualReservePlanck = unitToPlanck(actualReserve.toString(), units);

    setSliderReserve(val.decimalPlaces(3).toNumber());

    setReserve(actualReservePlanck);
    localStorage.setItem(
      `${network.name}_${activeAccount}_reserve`,
      actualReservePlanck.toString()
    );
  };

  return (
    <>
      <Close />
      <ModalPadding>
        <h2 className="title unbounded" style={{ margin: '0.5rem 0 2rem 0' }}>
          {t('updateReserve')}
        </h2>

        <WithSliderWrapper>
          <p>
            Control how much {unit} is reserved to pay for transaction fees.
            This amount is added on top of the existential deposit to ensure
            your account stays alive.
          </p>
          <div>
            <div className="slider no-value">
              <Slider
                min={0}
                max={maxReserve.toNumber()}
                value={sliderReserve}
                step={0.01}
                onChange={(val) => {
                  if (typeof val === 'number' && val >= minReserve.toNumber()) {
                    handleChange(new BigNumber(val));
                  }
                }}
                {...sliderProps}
              />
            </div>
          </div>

          <div className="stats">
            <CardHeaderWrapper>
              <h4>Existential Deposit</h4>
              <h2>
                {minReserve.decimalPlaces(4).toString()} {unit}
              </h2>
            </CardHeaderWrapper>

            <CardHeaderWrapper>
              <h4>Reserve for Tx Fees</h4>
              <h2>
                {new BigNumber(sliderReserve)
                  .minus(minReserve)
                  .decimalPlaces(4)
                  .toString()}
                &nbsp;
                {unit}
              </h2>
            </CardHeaderWrapper>
          </div>

          <div className="done">
            <ButtonPrimaryInvert
              text={t('done')}
              onClick={() => {
                setStatus(0);
              }}
              disabled={!accountHasSigner(activeAccount)}
            />
          </div>
        </WithSliderWrapper>
      </ModalPadding>
    </>
  );
};
