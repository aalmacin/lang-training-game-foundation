import {Logout} from "./Logout";

export const Admin = () => {
    const sentences = [];
    return (
        <div className="flex flex-col items-center">
            <h1>Admin</h1>
            <div>
                Choose the sentence:
                <select>
                    {sentences.map((sentence) => <option key={sentence.id}>{sentence.text}</option>)}
                </select>
            </div>
            <Logout/>
        </div>
    );
}