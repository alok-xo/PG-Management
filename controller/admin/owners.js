import owners from '../../models/owner/owners.js';

export const addOwners = async (req, res) => {
    const { firstName, lastName, number, designation, gender, age } = req.body;
    try {
        if (!firstName || !lastName || !number || !designation || !gender || !age) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newOwners = await owners.create({
            firstName,
            lastName,
            number,
            designation,
            gender,
            age
        });

        res.status(201).json({
            message: "Owner created successfully",
            code: 201,
            success: true,
            data: newOwners
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const updateOwner = async (req, res) => {
    try {
        const updatedOwnersInfo = await owners.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOwnersInfo) {
            return res.status(404).json({
                message: "Owners Info Not Found",
                code: 404,
                success: false
            });
        }
        res.status(200).json({
            message: "Updated Owners Info Successfully",
            code: 200,
            success: true,
            data: updatedOwnersInfo
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update Owners Info",
            code: 500,
            success: false,
            error: error.message
        })
    }
}
