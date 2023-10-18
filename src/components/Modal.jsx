function Modal({onClose}) {
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }

    }
  return (
    <div>
      
    </div>
  )
}

export default Modal
