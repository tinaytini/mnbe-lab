"use client";

export default function PeopleHero() {
    return (
        <section className="relative h-[400px] sm:h-[500px] overflow-hidden mb-20">
            <div className="absolute inset-0 bg-slate-900">
                <img 
                    src="/uploads/group-photo.jpg" 
                    alt="MNBE Lab Group Photo" 
                    className="w-full h-full object-cover object-top opacity-60"
                    onError={(e) => {
                        // Falls back to a nice gradient if image is missing
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                            parent.style.background = 'linear-gradient(to bottom right, #57068c, #1e0231)';
                        }
                    }}
                />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
                    Meet Our Team
                </h1>
                <div className="w-20 h-1 bg-brand-400 rounded-full" />
            </div>
            {/* Bottom wave/decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
        </section>
    );
}
