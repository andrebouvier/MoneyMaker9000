{/* Homepage component that explain the features of the app */}

export function Features() {
    return (
        <section id="Features" className="bg-background py-20 md:py-32 px-4">
            <div className="max-w-6xl max-auto flex flex-col items-center">
                <h2 className="text-text text-center text-4xl md:text-5xl font-bold">Features</h2>
                <p className="text-text-secondary text-center mt-4 max-w-3xl"> MoneyMaker 9000 offers a range of features to help you automate your options trading. </p>
            </div>
        </section>
    );
}