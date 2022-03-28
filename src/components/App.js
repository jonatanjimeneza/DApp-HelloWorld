import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
//import web3 from '../ethereum/web3'
import contrato_smarcontract from '../abis/HelloWorld.json'
import { Card } from 'react-bootstrap';


class App extends Component {
  async componentWillMount(){
    //Cargar de Web3.0
    await this.loadWeb3()
     // Carga de los datos de la Blockchain
     await this.loadBlockchainData()

  }
  //Cargar la web3.0
  async loadWeb3(){
    if(window.ethereum) {
      window.web3 = new Web3 (window.ethereum);
  try {
      await window.ethereum.request({method: "eth_requestAccounts"})
  } catch(error){
      alert('User denied account access...')
      }
  }
  else {
      alert('Non-Ethereum browser detected. You should trying Metamask!');
  }
  }

    // Carga de los datos de la Blockchain
    async loadBlockchainData() {
      const web3 = window.web3
      // Carga de la cuenta
      const accounts = await web3.eth.getAccounts()
      this.setState({account: accounts[0]})
      console.log('account', this.state.account)
      //Obtener el balance de la cuenta
      const balance = await web3.eth.getBalance(accounts[0])
      console.log(balance)
      this.setState({balance:web3.utils.fromWei(balance,'ether')})
      //Establecer el id de la red
      const networkId = '5777' // Rinkeby -> 4 , Ganache -> 5777, Emerald ->42261, matic->80001
      console.log('networkId: ', networkId)
      const networkData = contrato_smarcontract.networks[networkId]
      console.log('networkData: ', networkData)
      
      //Si estamos conectados a una red
      if(networkData) {
        //Obtener el abi.
        const abi = contrato_smarcontract.abi
        console.log('abi', abi)
        //Obtener la dirección
        const address = networkData.address
        console.log('address', address)
        //Obtener la dirección del contrato
        const contract = new web3.eth.Contract(abi, address)
        this.setState({contract})
        //Obtener el string Hello World del smart contract
        const hello_world = await this.state.contract.methods.helloworld().call()
        this.setState({Hello_World: hello_world})
        console.log('String:', hello_world)
      } else {
        //Alerta de no tener ningún smart contract desplegado en la red.
        window.alert('¡El Smart Contract no se ha desplegado en la red!')
      }
    }

  //Constructor de las variables.
  constructor(props){
    super(props)
    this.state ={
      account: '',
      contract: null,
      Hello_World:'',
      balance:''
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.youtube.com/channel/UCfspyHKd_MkUamR5OFNByfA"
            target="_blank"
            rel="noopener noreferrer"
          >
            DApp Hello World
          </a>
          <ul className='navbar-nav-px-3'>
            <li className='nav-item text-nowrap d-none d-sm-non d-sm-block'>
              <small className='text-white'><span id="Account">Account: {this.state.account}</span></small>
            </li>
            <li className='nav-item text-nowrap d-none d-sm-non d-sm-block'>
              <small className='text-white'><span id="Account">Balance: {this.state.balance} ETH</span></small>
            </li>

          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://www.youtube.com/channel/UCfspyHKd_MkUamR5OFNByfA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>DApp - Hello World</h1>
                &nbsp;

                <Card>
                <Card.Body>{this.state.Hello_World}</Card.Body>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
