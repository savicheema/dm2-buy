const getSubDomainOfPage = () => {
    const { host } = window.location;
    let splitHost = host.split(".");
    return splitHost[0];
}
export  {
    getSubDomainOfPage
}