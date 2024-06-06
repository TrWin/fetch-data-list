import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/api';

const UserList: React.FC = () => {
    const [summaryList, setSumList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let summaryUser:any;
        let jobs :string[] = [];
        const getUsers = async () => {
            try {
                const users = await fetchUsers();
                setLoading(false);

                users.forEach((user:any) => {
                    if (jobs?.includes(user.company.department)) {

                        //init new job
                        jobs.push(user.company.department);
    
                        summaryUser[user.company.department] = {
                            male: user.gender === "male" ? 1 : 0,
                            female: user.gender === "female" ? 1 : 0,
                            ageRange: String(user.age)+"-"+String(user.age),
                            hair: {
                                [user.hair.color]: 1
                            },
                            addressUser: {
                                [user.firstName+user.lastName]: user.address.postalCode
                            }
                        };
                    }else{
                        if (jobs?.includes(user.company.department)) {
                
                          //update gender
                          if (user.gender === "male") {
                            summaryUser[user.company.department].male++;
                          }else if(user.gender === "female"){
                            summaryUser[user.company.department].female++;
                          }
                          
                          //update age length
                          let lengthAge = summaryUser[user.company.department].ageRange.split("-");
                          if (user.age < Number(lengthAge[0])) {
                            summaryUser[user.company.department].ageRange = String(user.age)+"-"+String(lengthAge[1]);
                          }else if (user.age > Number(lengthAge[1])){
                            summaryUser[user.company.department].ageRange = String(lengthAge[0])+"-"+String(user.age);
                          }
                
                          //update hair color list
                          if (Object.keys(summaryUser[user.company.department].hair).includes(user.hair.color)) {
                            summaryUser[user.company.department].hair[user.hair.color] += 1
                          }else{
                            summaryUser[user.company.department].hair[user.hair.color] = 1
                          }
                
                          //add user address
                          summaryUser[user.company.department].addressUser[user.firstName+user.lastName] = user.address.postalCode
                        }
                      }
                });

                setSumList(summaryUser);

            } catch (error) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <pre>
                { JSON.stringify(summaryList, null, 2) }
            </pre>
        </div>
    );
};

export default UserList;
