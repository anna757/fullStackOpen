const Notification = ({ message, isError }) => {
    if (message === null || message === '') {
        return null
    }
    return (
        <div className={isError ? 'error' : 'success'}>
            {message}
        </div>
    )

}

export default Notification