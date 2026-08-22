import ServicesCards from './ServicesCards';

export default function ServicesSection() {
    return (
        <section className="bg-background px-4 py-24 md:px-16">
            <div className="mx-auto max-w-9xl">
                <div className="mx-auto mb-16 max-w-xl text-center">
                    <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">
                        What We Offer
                    </div>
                    <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                        Everything a stay needs
                    </h2>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-stone">
                        Handled quietly and well, so the only thing you have to think about is
                        enjoying your stay.
                    </p>
                </div>

                <ServicesCards />
            </div>
        </section>
    );
}