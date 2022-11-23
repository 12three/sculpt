import React from 'react';
import { useParams } from 'react-router-dom';

export const IndividualBlockPage = () => {
    let { blockId } = useParams();

                        return (
                            <div>Individual block page: {blockId}</div>
    )
};