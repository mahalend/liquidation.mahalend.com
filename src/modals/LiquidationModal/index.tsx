import { BigNumber } from "ethers";
import React, { useMemo, useState } from "react";
import Button from "../../components/Button";
import CollateralDropDown from "../../components/CollateralDropDown";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Selector from "../../components/Selector";
import TextWrapper from "../../components/TextWrapper";
import { getDisplayBalance } from "../../utils/formatBalance";
import {
  IModalProps,
  IUserBorrowReserve,
  IUserCollateralReserve,
  IUserDataWithHF,
} from "../../utils/interface";

interface IProps {
  selectedUserData: IUserDataWithHF;
}

const LiquidationModal = (props: IModalProps & IProps) => {
  const [amount, setAmount] = useState<string>("");

  const [openDepositedCollateral, setOpenDepositedCollateral] =
    useState<boolean>(false);
  const [selectedDepositedCollateral, setSelectedDepositedCollateral] =
    useState<string>("Select Receiving Collateral");
  const depositedCollateral = useMemo(() => {
    setSelectedDepositedCollateral(
      props.selectedUserData.collateralReserve[0].reserve.symbol
    );
    return props.selectedUserData.collateralReserve.map(
      (data) => data.reserve.symbol
    );
  }, [props.selectedUserData.collateralReserve]);
  /*const depositCollateralReserve: IUserCollateralReserve = useMemo(() => {
    return props.selectedUserData.collateralReserve.filter(
      (data) => data.reserve.symbol === selectedDepositedCollateral
    )[0];
  }, [props.selectedUserData.collateralReserve, selectedDepositedCollateral]);*/

  const [openBorrowToken, setOpenBorrowToken] = useState<boolean>(false);
  const [selectedBorrowToken, setSelectedBorrowToken] =
    useState<string>("Select Token");
  const borrowToken = useMemo(() => {
    setSelectedBorrowToken(
      props.selectedUserData.borrowReserve[0].reserve.symbol
    );
    return props.selectedUserData.borrowReserve.map(
      (data) => data.reserve.symbol
    );
  }, [props.selectedUserData.borrowReserve]);
  const borrowReserve: IUserBorrowReserve = useMemo(() => {
    return props.selectedUserData.borrowReserve.filter(
      (data) => data.reserve.symbol === selectedBorrowToken
    )[0];
  }, [props.selectedUserData.borrowReserve, selectedBorrowToken]);

  const maxAllowedLiquidation = useMemo(() => {
    // here if above CLOSE_FACTOR_HF_THRESHOLD then 50% allowed and if below then 100% allowed
    //ToDo: Above logic setup
    return (
      Number(
        getDisplayBalance(
          BigNumber.from(borrowReserve.currentTotalDebt),
          borrowReserve.reserve.decimals
        )
      ) / 2
    );
  }, [borrowReserve.currentTotalDebt, borrowReserve.reserve.decimals]);
  console.log("maxAllowedLiquidation", maxAllowedLiquidation);

  return (
    <Modal
      title={"Liquidate"}
      open={props.openModal}
      handleClose={props.onModalClose}
      closeButton
    >
      <div>
        <TextWrapper
          text={`${props.selectedUserData.id}`}
          align={"center"}
          className={"m-b-24"}
        />
        <div className={"m-b-24"}>
          <TextWrapper
            text={"Select Collateral"}
            fontWeight={"bold"}
            className={"m-b-12"}
          />
          <Selector
            openSelector={openDepositedCollateral}
            toggleSelector={() =>
              setOpenDepositedCollateral(!openDepositedCollateral)
            }
            dropdownValue={depositedCollateral}
            selectedData={selectedDepositedCollateral}
            setSelectedData={setSelectedDepositedCollateral}
            width={"100%"}
            dropDownWidth={"100%"}
          />
        </div>

        <div className={"m-b-24"}>
          <TextWrapper
            text={"Pay debt"}
            fontWeight={"bold"}
            className={"m-b-12"}
          />
          <div className={"single-line-center-between"}>
            <Input
              value={amount}
              setValue={(data) => setAmount(data)}
              maxTag={true}
              onMaxClick={() => {
                setAmount(
                  Number(
                    getDisplayBalance(BigNumber.from(0), 18, 18)
                  ).toString()
                );
              }}
            />
            <CollateralDropDown
              selectedSymbol={selectedBorrowToken}
              showDropDown={openBorrowToken}
              hasDropDown={borrowToken.length > 1}
              toggleDropDown={() => setOpenBorrowToken(!openBorrowToken)}
              symbols={borrowToken}
              ondropDownValueChange={(data) => setSelectedBorrowToken(data)}
            />
          </div>
        </div>

        <Button
          trackingid={"liquidate-modal"}
          className={"m-t-32 primary-button"}
        >
          Liquidate
        </Button>
      </div>
    </Modal>
  );
};

export default LiquidationModal;
