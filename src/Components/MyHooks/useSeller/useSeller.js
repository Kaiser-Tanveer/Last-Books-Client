import { useEffect, useState } from "react";


const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);

    useEffect(() => {
        fetch(`https://used-books-server.vercel.app/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsSeller(data.isSeller);
                setSellerLoading(false);
            })
    }, [email]);
    return [isSeller, sellerLoading];
}

export default useSeller;