// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/**
 * @dev Interface for Universal Apps on ZetaChain
 */
interface IUniversalApp {
    struct RevertContext {
        uint256 index;
        address sender;
        uint16 chainID;
        bytes message;
        bytes callData;
        RevertOptions revertOptions;
    }

    struct AbortContext {
        uint256 index;
        address sender;
        uint16 chainID;
        bytes message;
        address abortAddress;
    }

    struct RevertOptions {
        address abortAddress;
        bool callOnRevert;
        uint256 onRevertGasLimit;
    }

    function onCall(
        bytes calldata message,
        uint16 originChain,
        address originSender,
        bytes calldata
    ) external;

    function onRevert(RevertContext calldata ctx) external;

    function onAbort(AbortContext calldata ctx) external;
}
