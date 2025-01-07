function CurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    
    return(
        <div>
            {month} {year}
        </div>
    );
}

export default CurrentDate;