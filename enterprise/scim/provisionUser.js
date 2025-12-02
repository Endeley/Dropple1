export const enterpriseProvision = async (email, profile = {}) => {
    // TODO: create or update user in database
    console.log('Provision user', email, profile);
    return { email };
};
