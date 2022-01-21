import { callGraphQL } from "../../helperFunctions";
import {
    ListOrganizationsQuery,
    CreateOrganizationMutation,
    UpdateOrganizationMutation,
    DeleteOrganizationMutation
} from '../../API';
import { listOrganizations } from "../../graphql/queries";
import { createOrganization, updateOrganization, deleteOrganization } from "../../graphql/mutations";
import { OrganizationInfo } from './SuperAdminTypes';
import { ApiResponse } from "../AdminPanel/adminApi";


export const getOrganizations = async () : Promise<ApiResponse<OrganizationInfo[]>> => {
    try{

        const organizationsResult = await callGraphQL<ListOrganizationsQuery>(listOrganizations);
        const organizations = organizationsResult.data?.listOrganizations?.items.map((item) => ({   
            id: item?.id,
            name: item?.orgname
        } as OrganizationInfo));

        return {
            result: organizations || []
        };

    } catch(e){
        return {
            error: 'Could get get a list of organizations.'
        };
    }
}

export const addOrganization = async (organization : OrganizationInfo) => new Promise(async (resolve, reject) => {
    
    try{
        await callGraphQL<CreateOrganizationMutation>(createOrganization, {
            input: {
                id: organization.id,
                orgname: organization.name
            }
        });
        resolve(null);
    } catch (e){
        reject(`Kunne ikke legge til organisasjonen ${organization.name}.`);
    }
});

export const removeOrganization = (organization : OrganizationInfo) => new Promise(async (resolve, reject) => {

    try{
        await callGraphQL<DeleteOrganizationMutation>(deleteOrganization, {
            input: {
                id: organization.id
            }
        });
        resolve(null);
    } catch (e){
        reject(
            `Kunne ikke slette organization ${organization.name}.`
        );
    }
});