import Link from "next/link";

export default function Logo({ solid }: { solid?: boolean }) {
    return (
        <Link href="/" className="flex items-center group flex-shrink w-auto">
            <img
                src="/yaslab.svg"
                alt="YAS Lab Logo"
                className={`w-[130px] sm:w-[180px] h-auto group-hover:scale-95 transition-all ${!solid ? "brightness-0 invert" : "brightness-0 filter-brand-purple"
                    }`}
            />
        </Link>
    );
}
