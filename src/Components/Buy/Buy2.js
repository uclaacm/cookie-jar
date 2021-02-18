// import React, { Component } from "react";
// import './Buy.scss';

// class Buy2 extends Component {
//     constructor (props,context) { 
//         super(props, context)
    
//         this.onClickAddNotification = this.onClickAddNotification.bind(this)
        
//         this.toastRef = null
//       }
      
//       componentDidMount() {
//         this.toastRef = this.refs.toastNotifier
//       }
      
//       onClickAddNotification () {
//         const notif = {
//           icon:'message', 
//           title: 'title goes here ', 
//           message: 'some message to display for',
//         }
//         this.toastRef.addToast(notif)
//       }

//     render(){
//         return ( 
//             <div className="wrapper">
//               <div className="btn" onClick={this.onClickAddNotification}> Click here to Add</div>
//               <ToastNotification ref={'toastNotifier'} position={3}/>
//             </div>
//         )
//     }
// }

// class ToastNotification extends React.Component {
  
//     constructor (props,context) {
//       super(props, context)
  
        
//       this.state = {
//         toastsArray: list()
//       }  
      
//       this.positionMap = {
//         1 : 'top-left',
//         2 : 'top-right',
//         3 : 'bottom-right',
//         4 : 'bottom-left',
//       }
    
//       this.addToast = this.addToast.bind(this)
//       this.removeToast = this.removeToast.bind(this)
//       this.clearAllToast = this.clearAllToast.bind(this)
//     }
    
//     addToast (toastObject) {
//       toastObject && 
//       this.setState(({toastsArray})=>{
//         return {toastsArray: toastsArray.push(toastObject)}
//       })
//     }
    
//     removeToast(index) {
//       this.setState(({toastsArray})=>{
//         const current= toastsArray.get(index)
//         current.isDeleted =  true
//         return {toastsArray: toastsArray.set(index, current)}
//       })
      
//       setTimeout(function(){
//         this.setState(({toastsArray})=>{
//           return {toastsArray: toastsArray.delete(index)}
//         })
//       }.bind(this), 2000)
//     }
    
//     clearAllToast() {
      
//     }
    
//     render() {
//       const {toastsArray} = this.state
//       const position = this.positionMap[this.props.position] || 'top-right'
//       return (  
//       <div className={'toast-notification-panel ' + position}>    
//           {toastsArray.map((toast, index)=>{
//             return (
//          <ToastWrapper index={index} key={index} icon={toast.icon} title={toast.title} message={toast.message} isDeleted={toast.isDeleted} onClickToast={this.removeToast}/>  
//             )
//           })}
//       </div>
//       )
//     }
// }
  
// const ToastWrapper = ({index, icon, title, message, isDeleted, onClickToast})=>{
// return (
//     <div className={'toast-wrapper ' + icon + ' ' + (isDeleted && 'toast-out')} 
//     onClick={()=>onClickToast(index)}>
//     <div className="toast">
//         <div className="toast-header">{title}</div>  
//         <div className="toast-text">{message}</div>       
//     </div>
//     </div>
// )
// }
  
  

// export default Buy2;