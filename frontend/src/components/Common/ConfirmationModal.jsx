import IconBtn from "./IconBtn"

const ConfirmationModal = ({modalData}) =>{
    console.log(modalData)

    console.log(modalData , 'Modal active')
    return <div className="text-white">
        <div className="text-white">
            <p>{modalData?.text1}</p>
            <p>{modalData?.text2}</p>
            <div>
                <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} disabled={modalData?.disabled}/>
                <button onClick={modalData?.btn2Handler}>{modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
}

export default ConfirmationModal