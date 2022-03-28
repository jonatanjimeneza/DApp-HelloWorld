// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

//Smart contract del programa Hello World de programación.

contract HelloWorld{

    //Funcion que nos retorna un string fijo.
    function helloworld() external pure returns(string memory){
        return "Hello World Youtube!";
    }
}