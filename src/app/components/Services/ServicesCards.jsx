import { services } from "./ServicesData";

export default function ServicesCards() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
                <div
                    key={service.id}
                    className="group relative h-72 overflow-hidden rounded-md shadow-md"
                >
                    <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-active:scale-110"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/10 transition-all duration-500 group-hover:from-ink/95 group-hover:via-ink/70" />

                    <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-brass bg-ink/70 text-lg text-brass backdrop-blur-sm transition-colors duration-300 group-hover:bg-brass group-hover:text-ink group-active:bg-brass group-active:text-ink">
                        {service.icon}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="font-display text-lg font-medium text-ivory">
                            {service.title}
                        </h3>
                        <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-active:grid-rows-[1fr]">
                            <p className="overflow-hidden font-sans text-sm leading-relaxed text-ivory/75">
                                {service.desc}
                            </p>
                        </div>

                        <span className="mt-3 block h-px w-8 bg-brass transition-all duration-300 group-hover:w-full group-active:w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}