import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { DescriptorScreenVM } from "../interfaces/DescriptorScreen";

const useListScreensByDescriptor = () => {
    const [descritorScreenData, setDescriptorScreen] = useState<Array<DescriptorScreenVM>>([]);
    const params = useParams();

    console.log(location);

    useEffect(() => {
        setDescriptorScreen([]);
    }, []);

    return {
        descritorScreenData,
    }
}

export default useListScreensByDescriptor