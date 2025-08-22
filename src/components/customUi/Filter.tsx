import { useSearchParams } from "react-router";
import StyledButton from "./StyledButton";

const FilterOptions = ["all", "active", "completed"];

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("status") || FilterOptions[0];

    function handleClick(value: string) {
        searchParams.set("status", value);
        // if (searchParams.get("page")) searchParams.set("page", 1);

        setSearchParams(searchParams);
    }

    return (
        <section className='my-8'>
            <p
                className='w-fit flex items-center space-x-1
                             rounded-lg border border-gray-200'>
                {FilterOptions.map(filter => {
                    return (
                        <StyledButton
                            key={filter}
                            onClick={() => handleClick(filter)}
                            disabled={filter === currentFilter}
                            variant={"ghost"}
                            className={`capitalize ${
                                filter === currentFilter &&
                                "bg-accent text-accent-foreground"
                            }`}>
                            {filter}
                        </StyledButton>
                    );
                })}
            </p>
        </section>
    );
}

export default Filter;
